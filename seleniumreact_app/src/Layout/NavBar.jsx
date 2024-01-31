import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useStyles } from "./styles";
import { DashBoardIcon } from "../comman/icons";

const Paths = [
    {
        title: "Dashboard",
        icon: <DashBoardIcon />,
        path: "/",
    },
    {
        title: "Api",
        icon: <DashBoardIcon />,
        path: "/accordian",
    },
    {
        title: "Performance",
        icon: <DashBoardIcon />,
        path: "/Performance",
    },
];

export default function NavBar() {
    // const History = useHistory();
    const navigate = useNavigate();
    // const Location = useLocation();
    const classess = useStyles();
    const [activePath, setActivePath] = useState("/");

    return (
        <List className={classess.navMaintop}>
            {Paths.map((path, index) => {
                return (
                    <ListItem
                        button
                        style={{
                            // backgroundColor: Location.pathname === path.path ? "rgba(0,0,0,0.14)" : null,
                            borderRight:
                                Location.pathname === path.path
                                    ? "5px solid rgb(101, 77, 247)"
                                    : null,
                        }}
                        key={index}
                        onClick={() => {
                            setActivePath(path.path);
                            History.push(path.path);
                        }}
                    >
                        <ListItemIcon className={classess.icon}>
                            {React.cloneElement(path.icon, { color: Location.pathname === path.path ? 'rgb(101, 77, 247)' : 'black', })}
                        </ListItemIcon>
                        <ListItemText
                            primary={path.title}
                            className={`${classess.navTitle} ${Location.pathname === path.path ? classess.activeClass : ""
                                }`}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}