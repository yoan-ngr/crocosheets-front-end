import React, {Component} from 'react';
import {Link} from "react-router-dom";

function SheetToulBar(props) {

    return <div className={"flex justify-between "}>


        <div className={"w-4/12 flex gap-1 px-1"}>
            <div className="dropdown dropdown-hover">
                <label className="btn my-2" tabIndex="0">Fichier</label>
                <div className="dropdown-menu dropdown-menu-bottom-right">
                    <a className="dropdown-item text-sm"><div className="flex justify-between align-middle">
                        <span>Ouvrir</span>
                        <span>
                                    <kbd className={"kbd mr-1 text-xs"}>Ctrl</kbd>
                                    +
                                    <kbd className={"kbd ml-1 text-xs"}>O</kbd>
                                </span></div>
                    </a>
                    <a tabIndex="-1" className="dropdown-item text-sm">
                        <div className="flex justify-between align-middle">
                            <span>Sauvegarder</span>
                            <span>
                                        <kbd className={"kbd mr-1 text-xs"}>Ctrl</kbd>
                                        +
                                        <kbd className={"kbd ml-1 text-xs"}>S</kbd>
                                    </span>
                        </div>
                    </a>
                    <Link to={"/dashboard"} tabIndex="-1" className="dropdown-item text-sm">
                        <div className="flex justify-between align-middle">
                            <span>Quitter</span>
                            <span>
                                        <kbd className={"kbd mr-1 text-xs"}>Ctrl</kbd>
                                        +
                                        <kbd className={"kbd ml-1 text-xs"}>Q</kbd>
                                    </span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="dropdown dropdown-hover">
                <label className="btn my-2" tabIndex="0">Editer</label>
                <div className="dropdown-menu dropdown-menu-bottom-right">
                    <a className="dropdown-item text-sm">Copier</a>
                    <a tabIndex="-1" className="dropdown-item text-sm">Coller</a>
                </div>
            </div>

            <input
                className={"input input-ghost-success my-2 input-block"}
                placeholder={"Nom du document"}
                value={props.fileName}
                onChange={(e) => props.setFileName(e.target.value)}
            />
        </div>

        <div className={"w-5/12 px-12"}>
            <input className={"input input-ghost-secondary input-block my-2 font-mono"} placeholder="Entrez une formule..."/>
        </div>

        <div className={"w-3/12 flex gap-6 my-2 justify-center"}>
            <button className={"btn btn-secondary"}>Inviter</button>

            <div className="avatar-group">
                <div className="avatar">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar"/>
                </div>
                <div className="avatar">
                    <div>+000</div>
                </div>
            </div>
        </div>



    </div>

}

export default SheetToulBar;