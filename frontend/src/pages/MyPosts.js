import React, { Fragment, useState, useEffect, useContext } from "react";
import ThreadList from "../components/threads/ThreadList";
import useHttp from "../hooks/use-http";
import { getUserThreadsByName } from "../utils/database-api";
import { useParams } from "react-router-dom";
import styles from "./Home.module.css";
import UserContext from "../context/UserContext";

const MyPosts = () => {
    const username = localStorage.getItem("name");
    const {
        sendHttpRequest: getPostsRequest,
        status,
        data: loadedThreads,
    } = useHttp(getUserThreadsByName);

    useEffect(() => {
        console.log("user name :", username);
        getPostsRequest(username);
    }, []);

    return (
        <Fragment>
            <div
                style={{
                    display: "flex",
                    marginBottom: "-10px",
                    fontSize: "larger",
                    marginLeft: "400px",
                    marginBottom: "-50px",
                    marginTop: "3 0px",
                }}
            >
                {" "}
                <strong> My Threads</strong>{" "}
            </div>
            {/* <hr></hr> */}
            {status === "completed" && loadedThreads.length !== 0 && (
                <ThreadList threads={loadedThreads} />
            )}
        </Fragment>
    );
};

export default MyPosts;
