import React from "react";
import { useLocation } from "react-router-dom";
import DashboardTest from "./DashboardTest";

function ClassWrapper(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation()
      return (
        <Component
          {...props}
          location={{ location }}
        />
      );
    }
  
    return ComponentWithRouterProp;
}

export default ClassWrapper(DashboardTest)