import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

import { Header } from "../components";

export default function Page404() {
  return (
    <div>
      <Header />
      <div className="alert-wrapper">
        <Alert justifyContent={"center"} status="warning">
          <AlertIcon />
          404: Page not found. Click on logo to go back home.
        </Alert>
      </div>
    </div>
  );
}
