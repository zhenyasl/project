import React, { Fragment, useState, useEffect, useContext } from "react";
import ThreadList from "../components/threads/ThreadList";
import useHttp from "../hooks/use-http";
import { getUserThreadsByName } from "../utils/database-api";
import { useParams } from "react-router-dom";
import styles from "./Home.module.css";
import UserContext from "../context/UserContext";

const User = () => {
    const { username } = useParams();
    console.log(username);
    const {
        sendHttpRequest: getThreadsRequest,
        status,
        data: loadedThreads,
    } = useHttp(getUserThreadsByName);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        getThreadsRequest(username);
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
                    marginTop: "30px",
                }}
            >
                {" "}
                <strong> {username}</strong>{" "}
            </div>
            {status === "completed" && loadedThreads.length !== 0 && (
                <ThreadList threads={loadedThreads} />
            )}
        </Fragment>
    );
};

export default User;
