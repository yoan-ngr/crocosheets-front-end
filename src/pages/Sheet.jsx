import React, { useState, useEffect } from 'react';
import User from '../classes/User';
import SheetToulBar from "../components/SheetToulBar.jsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {io} from "socket.io-client";
import {useCookies} from "react-cookie";
import InviteModal from "../components/InviteModal.jsx";

function Sheet() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [selectedCell, setSelectedCell] = useState(null);
    const [cellData, setCellData] = useState(Array.from({ length: 26 }, () => Array.from({ length: 26 }, () => ({ formula: '', value: '' }))));
    let cell_focus;
    const [listeUtilisateurs, setListeUtilisateurs] = useState(new Map());
    //listeUtilisateurs.set("Bob",new User("Bob",3,4,'green'));


    const [fileName, setFileName] = useState("");
    const [members, setMembers] = useState([]);
    const [cookies, setCookies] = useCookies();
    const [selectedCellFormula, setSelectedCellFormula] = useState("");

    const [socket, setSocket] = useState(null);

    const params = useParams();
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);


    useEffect(() => {

        axios.post('http://localhost:3000/api/sheet/checkuser/' + params.id, {
            idUser : cookies.user.id
        })
            .catch(err => {
                console.log(err)
                navigate('/dashboard', {state: {errId : 2}})
            });

        axios.get('http://localhost:3000/api/sheet/' + params.id)
            .then(res => {
                //console.log(res.data.data.contenu);
                setFileName(res.data.data.nomDocument);
                setIsOwner(res.data.data.proprietaire === cookies.user.id)

                let content = [];
                const lines = res.data.data.contenu.split('\n');

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();

                    if (line) {
                        const values = line.split(';');
                        content.push(values);
                    }
                }


                const updatedCellData = [...cellData];
                for (let i = 0; i < content.length; i++) {
                    for (let j = 0; j < content[i].length; j++) {
                        if (content[i][j].startsWith('=')) {
                            updatedCellData[i][j] = { formula: content[i][j], value: evalFormula(content[i][j].substring(1)) };
                        } else {
                            updatedCellData[i][j] ={ formula: content[i][j], value: content[i][j] };
                        }
                    }
                }
                setCellData(updatedCellData);


                let localSocket = io('http://localhost:3000');
                localSocket.emit('identification', cookies.user, params.id)
                localSocket.on('user_connected',(users) => {
                    setMembers(users)
                    updateUserList(users)
                })
                localSocket.on('user_disconnected',(users) => {
                    setMembers(users)
                    updateUserList(users)
                })
                localSocket.on('selected_cell', (users) => {
                    updateUserList(users)
                })
                localSocket.on('selected_cell', (users) => {
                    updateUserList(users)
                })
                localSocket.on('modified_cell', (x, y, val) => {
                    const updatedCellData = [...cellData];
                    const inputValue = val;

                    if (inputValue.startsWith('=')) {
                        updatedCellData[x][y] = { formula: inputValue, value: evalFormula(inputValue.substring(1)) };
                    } else {
                        updatedCellData[x][y] = { formula: inputValue, value: inputValue };
                    }

                    setCellData(updatedCellData);


                })
                setSocket(localSocket);
            }).catch(err => {
                console.log(err);
            })
        ;

    }, []);

    function disconnect () {
        socket.disconnect();
    }

    function updateUserList (users) {
        let tmp = new Map();
        for (let i = 0; i < users.length; i++) {
            tmp.set(users[i].id, new User(users[i].infos.username, users[i].infos.x, users[i].infos.y, users[i].infos.color))
        }
        setListeUtilisateurs(tmp)
    }

    function save () {
        socket.emit('save', params.id)
    }

    function copy () {
        navigator.clipboard.writeText(selectedCellFormula);
    }

    function paste () {
        let rowIndex = selectedCell.row;
        let colIndex = selectedCell.col;
        navigator.clipboard.readText().then((cliptext) => {
            document.getElementById(`cell-${rowIndex}-${colIndex}`).textContent = cliptext;
            enregistrer_case(selectedCell.row, selectedCell.col);
        });

    }

    const handleCellClick = (rowIndex, colIndex) => {
        if (selectedCell != null && cell_focus != null) enregistrer_case(selectedCell.row, selectedCell.col);
        changer_de_case(rowIndex, colIndex);
    };

    const handleCellDoubleClick = (e) => {
        const rowIndex = parseInt(e.target.getAttribute('data-row'));
        const colIndex = parseInt(e.target.getAttribute('data-col'));

        e.target.contentEditable = true;
        e.target.innerHTML = cellData[rowIndex][colIndex].formula;
        e.target.focus();
        cell_focus = e.target;
    };

    function enregistrer_case(rowIndex, colIndex) {
        const updatedCellData = [...cellData];
        const inputValue = document.getElementById(`cell-${rowIndex}-${colIndex}`).textContent.replace(/\n/g, '');
        console.log("test")

        if (inputValue.startsWith('=')) {
            updatedCellData[rowIndex][colIndex] = { formula: inputValue, value: evalFormula(inputValue.substring(1)) };
        } else {
            updatedCellData[rowIndex][colIndex] = { formula: inputValue, value: inputValue };
        }

        setCellData(updatedCellData);
        serveur_modifier_case(rowIndex, colIndex);
    }

    function evalFormula(formula) {
        const regex = /[A-Z]\d+/g;
        const references = formula.match(regex);

        if (references) {
            references.forEach((ref) => {
                const [refCol, refRow] = parseReference(ref);
                console.log(ref)
                console.log( [refCol, refRow])
                const refValue = cellData[refRow][refCol].value;
                formula = formula.replace(ref, refValue);
            });
        }

        try {
            return eval(formula);
        } catch (error) {
            console.error('Error evaluating formula:', error);
            return '#ERROR';
        }
    }

    function parseReference(reference) {
        const refCol = parseInt(reference.match(/\d+/)[0]);
        const refRow = alphabet.indexOf(reference.match(/[A-Z]+/)[0]);
        return [refCol, refRow];
    }

    function serveur_modifier_case(rowIndex, colIndex) {
        console.log("Le serveur doit mettre à jour la case (" + rowIndex + " ; " + colIndex + ") avec la formule : " + cellData[rowIndex][colIndex].formula);
        console.log("Nouvelle valeur : " + cellData[rowIndex][colIndex].value);

        socket?.emit('modify_cell', rowIndex, colIndex, cellData[rowIndex][colIndex].formula,params.id);
    }

    function changer_de_case(rowIndex, colIndex) {
        if (rowIndex >= 0 && rowIndex <= 25 && colIndex >= 0 && colIndex <= 25) {
            setSelectedCell({ row: rowIndex, col: colIndex });
            setSelectedCellFormula(cellData[rowIndex][colIndex].formula)
            if(socket != null)
                socket.emit('select_cell', cookies.user.id, rowIndex, colIndex,params.id);
        }
    }

    const handleCellKeyDown = (e, rowIndex, colIndex) => {
        if (e.key === 'Enter') {
            enregistrer_case(rowIndex, colIndex);
            e.preventDefault();
            e.target.contentEditable = false;
            e.target.blur();
        }
    };

    const handleNameKeyDown = (e) => {
        if (e.key === 'Enter'){
            e.target.blur();
        }
    }

    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if (e.key === 'Enter' && selectedCell) {
                const selectedCellElement = document.querySelector(`#cell-${selectedCell.row}-${selectedCell.col}`);

                if (selectedCellElement && (cell_focus !== selectedCellElement)) {
                    e.preventDefault(); // Empêche l'ajout de la nouvelle ligne
                    selectedCellElement.contentEditable = true;
                    selectedCellElement.focus();
                    cell_focus = selectedCellElement;
                } else if (selectedCellElement && cell_focus === selectedCellElement) {
                    selectedCellElement.blur(); // Supprime le focus de la cellule en cours d'édition
                    cell_focus = null;
                }

            } else if ((['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) && cell_focus !== document.activeElement) {
                e.preventDefault(); // Empêche le défilement de la page avec les touches de direction

                if (e.key === 'ArrowUp') {
                    changer_de_case(selectedCell.row - 1, selectedCell.col)
                } else if (e.key === 'ArrowDown') {
                    changer_de_case(selectedCell.row + 1, selectedCell.col)
                } else if (e.key === 'ArrowLeft') {
                    changer_de_case(selectedCell.row, selectedCell.col - 1)
                } else if (e.key === 'ArrowRight') {
                    changer_de_case(selectedCell.row, selectedCell.col + 1)
                }
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [selectedCell]);



    function get_color_case(rowIndex, colIndex) {
        // Vérifier si la case est celle d'un utilisateur sélectionné
        if (selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex) {
            return 'bg-green-500 bg-opacity-25';
        } else {// Vérifier si la case correspond à celle d'un utilisateur dans la listeUtilisateurs
            for (const [i, utilisateur] of listeUtilisateurs) {
                if (utilisateur.coordX === rowIndex && utilisateur.coordY === colIndex) {
                    return `bg-${utilisateur.color}-8 bg-opacity-25`;
                }
            }
            return '';
        }
    }

    function modify_filename(name){
        axios.patch('http://localhost:3000/api/sheet/' + params.id, {
            "newName" : name
        })
            .then(() => {

            })
            .catch((e) => {
                console.log(e)
            });

    }


    return (
        <div>
            <SheetToulBar
                fileName={fileName}
                setFileName={setFileName}
                members={members}
                modify={modify_filename}
                enter={handleNameKeyDown}
                isOwner={isOwner}
                save={save}
                disconnect={disconnect}
                copy={copy}
                paste={paste}
            />

            <div className="bg-red-8 bg-green-8 bg-blue-8 bg-yellow-8 bg-pink-8 bg-purple-8"></div>
            <div className="overflow-scroll">
                <table className="table w-[128rem]">
                    <thead>
                    <tr>
                        <th className="w-12"></th>
                        {Array.from({length: 26}, (_, index) => (
                            <th key={index} className="w-12">
                                {index}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({length: 26}, (_, rowIndex) => (
                        <tr key={`${rowIndex}`}>
                            <td className="w-12">{alphabet.charAt(rowIndex)}</td>
                            {Array.from({length: 26}, (_, colIndex) => (
                                <td
                                    key={`cell-${rowIndex}-${colIndex}`}
                                    id={`cell-${rowIndex}-${colIndex}`}
                                    data-row={rowIndex}
                                    data-col={colIndex}
                                    contentEditable={selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex}
                                    suppressContentEditableWarning={true}
                                    className={'w-48 max-w-[6rem] overflow-x-hidden border-solid border border-black font-mono p-2 ' + get_color_case(rowIndex,colIndex)}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    onDoubleClick={handleCellDoubleClick}
                                    onKeyDown={(e) => handleCellKeyDown(e, rowIndex, colIndex)}
                                >
                                    {selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex
                                        ? cellData[rowIndex][colIndex].formula
                                        : cellData[rowIndex][colIndex].value}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Sheet;
