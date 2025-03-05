// modules/path-resolver.js
function resolvePath(relativePath) {
    // Get the current page's URL
    const currentUrl = window.location.href;
  
    // Create a URL object
    const url = new URL(currentUrl);
  
    // Resolve the relative path against the current URL
    const resolvedPath = new URL(relativePath, url).pathname;
  
    return resolvedPath;
  }