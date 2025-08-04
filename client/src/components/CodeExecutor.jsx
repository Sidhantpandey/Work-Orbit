import React, { useState } from 'react';
import webContainerService from '../services/webContainer';

const CodeExecutor = ({ code, language, onExecutionResult }) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  const executeCode = async () => {
    setIsExecuting(true);
    try {
      const result = await webContainerService.executeCode(code, language);
      setExecutionResult(result);
      
      // Send result back to chat
      if (onExecutionResult) {
        const resultMessage = result.success 
          ? `Execution successful:\n${result.output}`
          : `Execution failed:\n${result.error}`;
        onExecutionResult(resultMessage);
      }
    } catch (error) {
      const errorResult = {
        success: false,
        error: error.message,
        output: ''
      };
      setExecutionResult(errorResult);
      
      if (onExecutionResult) {
        onExecutionResult(`❌ Execution failed:\n${error.message}`);
      }
    } finally {
      setIsExecuting(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="bg-gray-900 text-green-400 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 text-sm">{language}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyCode}
            className="text-gray-400 hover:text-white transition text-sm px-2 py-1 rounded"
            title="Copy code"
          >
            <i className="ri-file-copy-line"></i>
          </button>
          <button
            onClick={executeCode}
            disabled={isExecuting}
            className={`px-3 py-1 rounded text-sm font-medium transition ${
              isExecuting
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isExecuting ? (
              <span className="flex items-center gap-1">
                <i className="ri-loader-4-line animate-spin"></i>
                Running...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <i className="ri-play-fill"></i>
                Run
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="p-4">
        <pre className="text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>

      {/* Execution Result */}
      {executionResult && (
        <div className="border-t border-gray-700 p-4">
          <div className="text-xs text-gray-400 mb-2">Output:</div>
          <div className={`text-sm p-2 rounded ${
            executionResult.success 
              ? 'bg-green-900/20 text-green-300' 
              : 'bg-red-900/20 text-red-300'
          }`}>
            <pre className="whitespace-pre-wrap">
              {executionResult.success ? executionResult.output : executionResult.error}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeExecutor;