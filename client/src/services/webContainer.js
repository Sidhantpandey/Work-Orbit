import { WebContainer } from '@webcontainer/api';

class WebContainerService {
  constructor() {
    this.webcontainer = null;
    this.isBooting = false;
  }

  async initialize() {
    if (this.webcontainer || this.isBooting) {
      return this.webcontainer;
    }

    this.isBooting = true;
    try {
      this.webcontainer = await WebContainer.boot();
      console.log('WebContainer initialized successfully');
      return this.webcontainer;
    } catch (error) {
      console.error('Failed to initialize WebContainer:', error);
      throw error;
    } finally {
      this.isBooting = false;
    }
  }

async executeCode(code, language = 'javascript') {
  try {
    if (!this.webcontainer) {
      await this.initialize();
    }

    let filename, content, command;

    switch (language.toLowerCase()) {
      case 'javascript':
      case 'js':
        filename = 'script.js';
        content = code;
        command = 'node script.js';
        break;
      case 'html':
        filename = 'index.html';
        content = code;
        command = 'echo "HTML file created successfully"';
        break;
      case 'css':
        filename = 'styles.css';
        content = code;
        command = 'echo "CSS file created successfully"';
        break;
      case 'json':
        filename = 'data.json';
        content = code;
        command = 'cat data.json';
        break;
      default:
        filename = `script.${language}`;
        content = code;
        command = `echo "File created: ${filename}"`;
    }

    await this.webcontainer.fs.writeFile(filename, content);
    const process = await this.webcontainer.spawn('sh', ['-c', command]);

    let output = '';
    let error = '';

    const decoder = new TextDecoder();

    // Handle stdout
    const stdoutReader = process.output?.getReader?.();
    if (stdoutReader) {
      while (true) {
        const { value, done } = await stdoutReader.read();
        if (done) break;
        if (value) {
          output += decoder.decode(value, { stream: true });
        }
      }
    }

    // Handle stderr
    const stderrReader = process.stderr?.getReader?.();
    if (stderrReader) {
      while (true) {
        const { value, done } = await stderrReader.read();
        if (done) break;
        if (value) {
          error += decoder.decode(value, { stream: true });
        }
      }
    }

    const exitCode = await process.exit;

    return {
      success: exitCode === 0,
      output: output.trim() || 'Code executed successfully',
      error: error.trim(),
      exitCode
    };

  } catch (error) {
    console.error('Error executing code:', error);
    return {
      success: false,
      output: '',
      error: error.message || 'Failed to execute code',
      exitCode: 1
    };
  }
}


  async createProject(files) {
    try {
      if (!this.webcontainer) {
        await this.initialize();
      }

      // Create package.json if not exists
      if (!files['package.json']) {
        files['package.json'] = {
          file: {
            contents: JSON.stringify({
              name: 'webcontainer-project',
              version: '1.0.0',
              type: 'module',
              scripts: {
                start: 'node index.js'
              }
            }, null, 2)
          }
        };
      }

      await this.webcontainer.mount(files);
      
      // Install dependencies if package.json exists
      const installProcess = await this.webcontainer.spawn('npm', ['install']);
      await installProcess.exit;

      return { success: true, message: 'Project created successfully' };
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, error: error.message };
    }
  }

  async startDevServer() {
    try {
      if (!this.webcontainer) {
        await this.initialize();
      }

      const serverProcess = await this.webcontainer.spawn('npm', ['start']);
      
      // Listen for server ready
      this.webcontainer.on('server-ready', (port, url) => {
        console.log(`Server ready at ${url}`);
      });

      return serverProcess;
    } catch (error) {
      console.error('Error starting dev server:', error);
      throw error;
    }
  }
}

export default new WebContainerService();