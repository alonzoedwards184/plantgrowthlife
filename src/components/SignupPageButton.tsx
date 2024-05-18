// SignupPageButton.tsx

import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface SignupPageButtonProps {
  children: React.ReactNode;
  onClick: () => Promise<void> | void; // Include onClick prop
}

const SignupPageButton: React.FC<SignupPageButtonProps> = ({ children }) => {
  return (
    <Link to="/signup">
      <Button variant="primary" type="button">
        {children}
      </Button>
    </Link>
  );
};

export default SignupPageButton;
