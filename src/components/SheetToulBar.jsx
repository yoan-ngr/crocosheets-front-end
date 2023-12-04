import React, {Component} from 'react';

class SheetToulBar extends Component {
    render() {
        return (
            <div className={"flex justify-between "}>


                <div className={"w-4/12 flex gap-1 px-1"}>
                    <div className="dropdown dropdown-hover">
                        <label className="btn btn-solid-primary my-2" tabIndex="0">Fichier</label>
                        <div className="dropdown-menu dropdown-menu-bottom-right">
                            <a className="dropdown-item text-sm">Ouvrir</a>
                            <a tabIndex="-1" className="dropdown-item text-sm">Sauvegarder</a>
                            <a tabIndex="-1" className="dropdown-item text-sm">Quitter</a>
                        </div>
                    </div>

                    <div className="dropdown dropdown-hover">
                        <label className="btn btn-solid-primary my-2" tabIndex="0">Editer</label>
                        <div className="dropdown-menu dropdown-menu-bottom-right">
                            <a className="dropdown-item text-sm">Copier</a>
                            <a tabIndex="-1" className="dropdown-item text-sm">Coller</a>
                        </div>
                    </div>

                    <input className={"input input-solid-success my-2 input-block"} placeholder={"écrivez votre propre titre"}/>
                </div>

                <div className={"w-5/12"}>
                    <input className={"input input-ghost-secondary input-block my-2"}/>
                </div>

                <div className={"w-3/12"}>
                    <button className={"btn btn-secondary"}>Inviter</button>

                    <div className="avatar-group">
                        <div className="avatar avatar-squared">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar"/>
                        </div>

                        <div className="avatar avatar-online avatar-ring avatar-squared avatar-hover">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar"/>
                        </div>
                        <div className="avatar avatar-squared avatar-ring-primary">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar"/>
                        </div>
                        <div className="avatar">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar"/>
                        </div>
                        <div className="avatar">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar"/>
                        </div>
                        <div className="avatar">
                            <div>+000</div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}

export default SheetToulBar;