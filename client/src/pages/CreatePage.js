import React, { useState, useEffect, useContext } from "react";
import useHttp from "../hooks/http.hook";
import AuthContext from "../context/auth.context";

const CreatePage = () => {
  const auth = useContext(AuthContext);
  const [link, setLink] = useState("");
  const { request } = useHttp();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request("/link/generate", "POST", { from: link }, {
          Authorization: `Bearer ${auth.token}`
        });
        console.log(data);
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="google.com"
            id="link"
            type="text"
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
