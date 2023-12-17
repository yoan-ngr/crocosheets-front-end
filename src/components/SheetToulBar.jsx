import React, {Component, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Avatar from "./Avatar.jsx";
import {useCookies} from "react-cookie";
import InviteModal from "./InviteModal.jsx";

function SheetToulBar(props) {

    const [cookies, setCookies] = useCookies();
    const maxMembers = 4;

    const navigate = useNavigate();

    const displayAvatars = () => {

        let tmp = [];
        let sup = 0;
        for (let i = 0; i < props.members.length; i++) {
            if(i < maxMembers) {
                tmp.push({username : props.members[i].infos.username, color : props.members[i].infos.color})
            }else if(i === maxMembers) {
                tmp.push("-1");
                sup++;
            }else {
                sup++;
            }
        }

        return tmp.map(member => {
            return member.username === "-1" ? <Avatar key={-1} count={sup} /> : <Avatar key={member.username} username={member.username} color={member.color} />
        })
    }

    const handleQuit = () => {
        props.disconnect();
        navigate('/dashboard');
        return;
    }

    return <div className={"flex justify-between "}>


        <div className={"w-4/12 flex gap-1 px-1"}>
            <div className="dropdown dropdown-hover">
                <label className="btn my-2" tabIndex="0">Fichier</label>
                <div className="dropdown-menu dropdown-menu-bottom-right">
                    <a className="dropdown-item text-sm" onClick={() => props.save()}>
                        <div className="flex justify-between align-middle">
                            <span>Sauvegarder</span>
                        </div>
                    </a>
                    <a tabIndex="-1" className="dropdown-item text-sm" onClick={handleQuit}>
                        <div className="flex justify-between align-middle">
                            <span>Quitter</span>
                        </div>
                    </a>
                </div>
            </div>

            <div className="dropdown dropdown-hover">
                <label className="btn my-2" tabIndex="0">Editer</label>
                <div className="dropdown-menu dropdown-menu-bottom-right">
                    <a className="dropdown-item text-sm" onClick={() => props.copy()}>Copier</a>
                    <a tabIndex="-1" className="dropdown-item text-sm" onClick={() => props.paste()}>Coller</a>
                </div>
            </div>

            <input
                className={"input input-ghost-success my-2 input-block"}
                placeholder={"Nom du document"}
                value={props.fileName}
                onChange={(e) => props.setFileName(e.target.value)}
                onBlur={(e) => props.modify(e.target.value)}
                onKeyDown={(e) => props.enter(e)}
            />
        </div>

        <div className={"w-3/12 flex gap-6 my-2 justify-center"}>
            {
                props.isOwner && <><label className="btn btn-secondary" htmlFor="modal-1">Inviter</label>
                <InviteModal /></>
            }


            <div className="avatar-group">
                {
                    displayAvatars()
                }
            </div>
        </div>



    </div>

}

export default SheetToulBar;