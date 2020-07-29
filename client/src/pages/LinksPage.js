import React, { useState, useContext, useCallback, useEffect } from "react";
import useHttp from "../hooks/http.hook";
import AuthContext from "../context/auth.context";
import Loader from '../components/Loader';
import LinkList from '../components/LinkList';

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/link/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {}
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading ){
    return <Loader />
  }

  return (
    <>
      {<LinkList links={links}/>}
    </>
  )
};

export default LinksPage;
