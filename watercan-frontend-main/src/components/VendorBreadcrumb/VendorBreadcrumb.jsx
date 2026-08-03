import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AppBarWrap } from "./VendorBreadcrumb.styles";

function VendorBreadcrumb() {
  const location = useLocation();

  // Generate breadcrumbs from the current path
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbItems = [];

    let currentPath = "";

    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Clean and format each segment
      const displayText =
        segment.toLowerCase() === "faq"
          ? "FAQ"
          : decodeURIComponent(segment.charAt(0).toUpperCase() + segment.slice(1));

      breadcrumbItems.push(
        <Breadcrumb.Item key={currentPath}>
          {index !== pathnames.length - 1 ? (
            <Link to={currentPath}>{displayText}</Link>
          ) : (
            <span>{displayText}</span>
          )}
        </Breadcrumb.Item>
      );
    });

    return breadcrumbItems;
  };

  return (
    <AppBarWrap>
      <Breadcrumb>
        {generateBreadcrumbs()}
      </Breadcrumb>
    </AppBarWrap>
  );
}

export default VendorBreadcrumb;
