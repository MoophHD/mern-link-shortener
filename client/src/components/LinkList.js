import React from "react";
import { Link } from "react-router-dom";

const LinkList = ({ links }) => {
  if (!links.length) {
    return <p className="center">There are no links...</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>N</th>
          <th>Original Link</th>
          <th>Shortened link</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={`link row n${index}`}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>More</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LinkList;
