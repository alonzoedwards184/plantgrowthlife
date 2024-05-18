import { useEffect } from "react";

function PageRefresh() {
  useEffect(() => {
    // Refresh the page
    window.location.reload();
  }, []);

  return null; // This component doesn't render anything visible
}

export default PageRefresh;
