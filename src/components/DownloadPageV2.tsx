import { TeamInfo } from "../services/CurrentTeams";
import { PickTeam, SelectedTeamInfo } from "./PickTeam";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useCallback, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { downloadCSV, EMIT_TYPES } from "../action/downloadCSV";

const Step = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 1em 0;
`;

export const DownloadPage: React.FunctionComponent<{ teamInfo: TeamInfo }> = ({ teamInfo }) => {
    const [selectedInfo, setSelectedInfo] = useState<null | SelectedTeamInfo>(null);
    const canDownload = useMemo(() => selectedInfo !== null, [selectedInfo]);

    const executeDownload = (type: EMIT_TYPES) => {
        downloadCSV({
            newGamesOnly: true,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            url: selectedInfo!.snokingUrl,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            teamId: selectedInfo!.teamId,
            emit: type,
        });
    };

    return (
        <div
            className={css`
                width: 100vw;
                display: flex;
                flex-direction: column;
                align-items: center;
            `}
        >
            <Step>
                <PickTeam
                    className={css`
                        width: 100%;
                        max-width: 600px;
                    `}
                    teamInfo={teamInfo}
                    onTeamSelected={setSelectedInfo}
                />
            </Step>
            <Step>
                <div
                    className={css`
                        display: flex;
                        gap: 1em;
                    `}
                >
                    <Button
                        variant="primary"
                        disabled={!canDownload}
                        onClick={() => executeDownload(EMIT_TYPES.BENCH_APP)}
                    >
                        Download BenchApp CSV
                    </Button>
                    <Button
                        variant="primary"
                        disabled={!canDownload}
                        onClick={() => executeDownload(EMIT_TYPES.TEAM_COWBOY)}
                    >
                        Download Team Cowboy CSV
                    </Button>
                </div>
            </Step>
        </div>
    );
};
