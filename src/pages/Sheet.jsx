import React, { useState, useEffect } from 'react';
import User from '../classes/User';
import SheetToulBar from "../components/SheetToulBar.jsx";
import axios from "axios";
import {useParams} from "react-router-dom";
import {io} from "socket.io-client";
import {useCookies} from "react-cookie";

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

    const [socket, setSocket] = useState(null);

    const params = useParams();


    useEffect(() => {


        axios.get('http://localhost:3000/api/sheet/' + params.id)
            .then(res => {
                //console.log(res.data.data);
                setFileName(res.data.data.nomDocument);
                let localSocket = io('http://localhost:3000');
                localSocket.emit('identification', cookies.user)
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
                setSocket(localSocket);
            }).catch(err => {
                console.log(err);
            })
        ;

    }, []);

    function updateUserList (users) {
        let tmp = new Map();
        for (let i = 0; i < users.length; i++) {
            tmp.set(users[i].id, new User(users[i].infos.username, users[i].infos.x, users[i].infos.y, users[i].infos.color))
        }
        setListeUtilisateurs(tmp)
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
    }

    function changer_de_case(rowIndex, colIndex) {
        if (rowIndex >= 0 && rowIndex <= 25 && colIndex >= 0 && colIndex <= 25) {
            //setSelectedCell({ row: rowIndex, col: colIndex });
            if(socket != null)
                socket.emit('select_cell', cookies.user.id, rowIndex, colIndex);
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


    return (
        <div>
            <SheetToulBar
                fileName={fileName}
                setFileName={setFileName}
                members={members}
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
