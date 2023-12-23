"use client";

import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const Profile = () => {
  const [fetchedData, setFetchedData] = useState();

  const memoizedData = useMemo(() => {
    useEffect(() => {}, []);
  }, []);

  return <div>Profile</div>;
};

export default Profile;
