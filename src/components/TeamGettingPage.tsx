import * as React from "react";

import Spinner from "react-bootstrap/Spinner";

import { DownloadPage } from "./DownloadPageV2";
import { Instructions } from "./Instructions";

import { getCurrentTeams, TeamInfo } from "../services/CurrentTeams";
import { useEffect, useState } from "react";

export const TeamGettingPage: React.FunctionComponent = () => {
    const [teams, setTeams] = useState<null | TeamInfo>(null);
    useEffect(() => {
        getCurrentTeams().then((teams) => setTeams(teams));
    }, []);
    return (
        <>
            {teams ? (
                <>
                    <DownloadPage teamInfo={teams} />
                    <Instructions />
                </>
            ) : (
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "1em" }}>
                    <Spinner animation="border" />
                </div>
            )}
        </>
    );
};
