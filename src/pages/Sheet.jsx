import React, { useState, useEffect } from 'react';

function Sheet() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [selectedCell, setSelectedCell] = useState(null);
    const [cellValues, setCellValues] = useState(Array.from({ length: 26 }, () => Array.from({ length: 26 }, () => '')));
    let cell_focus;


    const handleCellClick = (rowIndex, colIndex) => {
        if(selectedCell != null && cell_focus != null) enregistrer_case(selectedCell.row,selectedCell.col)
        changer_de_case(rowIndex,colIndex)

    };

    const handleCellDoubleClick = (e) => {
        e.target.contentEditable = true;
        e.target.focus();
        cell_focus = e.target;
    };
    function enregistrer_case(rowIndex, colIndex) {
        const updatedCellValues = [...cellValues];
        const inputValue = document.getElementById(`cell-${rowIndex}-${colIndex}`).textContent.replace(/\n/g, '');

        if (inputValue.startsWith('=')) {
            // Evaluate formula
            const result = evalFormula(inputValue.substring(1));
            updatedCellValues[rowIndex][colIndex] = result;
        } else {
            updatedCellValues[rowIndex][colIndex] = inputValue;
        }

        setCellValues(updatedCellValues);
        serveur_modifier_case(rowIndex, colIndex);
    }

    function evalFormula(formula) {
        const regex = /[A-Z]\d+/g;
        const references = formula.match(regex);

        if (references) {
            references.forEach((ref) => {
                const [refCol, refRow] = parseReference(ref);
                console.log(refCol +" "+refRow)

                const refValue = cellValues[refRow][refCol];
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



    function serveur_modifier_case(rowIndex,colIndex){
        console.log("le serveur doit metre a jour la case ("+rowIndex+" ; "+colIndex +") avec la valeur : "+ cellValues[rowIndex][colIndex])
    }
    function changer_de_case(rowIndex,colIndex) {
        if (rowIndex >= 0 && rowIndex <= 25 && colIndex >= 0 && colIndex <= 25) {
            setSelectedCell({row: rowIndex, col: colIndex});
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
            if (e.key === 'Enter' && selectedCell ) {
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

            }else if ((['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) && cell_focus !== document.activeElement) {
                e.preventDefault(); // Empêche le défilement de la page avec les touches de direction

                if (e.key === 'ArrowUp') {
                    changer_de_case(selectedCell.row - 1,selectedCell.col )
                } else if (e.key === 'ArrowDown' ) {
                    changer_de_case(selectedCell.row + 1,selectedCell.col )
                } else if (e.key === 'ArrowLeft') {
                    changer_de_case(selectedCell.row ,selectedCell.col -1 )
                } else if (e.key === 'ArrowRight') {
                    changer_de_case(selectedCell.row ,selectedCell.col +1 )
                }
            }
        };


        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [selectedCell]);

    return (
        <div className="overflow-scroll">
            <table className="table w-[128rem]">
                <thead>
                <tr>
                    <th className="w-12"></th>
                    {Array.from({ length: 26 }, (_, index) => (
                        <th key={index} className="w-12">
                            {index}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {Array.from({ length: 26 }, (_, rowIndex) => (
                    <tr key={`${rowIndex}`}>
                        <td className="w-12">{alphabet.charAt(rowIndex)}</td>
                        {Array.from({ length: 26 }, (_, colIndex) => (
                            <td
                                key={`cell-${rowIndex}-${colIndex}`}
                                id={`cell-${rowIndex}-${colIndex}`}
                                contentEditable={selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex}
                                className={`w-48 max-w-[6rem] overflow-x-hidden border-solid border border-black font-mono p-2 ${
                                    selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'bg-green-500 bg-opacity-25' : ''
                                }`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                onDoubleClick={handleCellDoubleClick}
                                onKeyDown={(e) => handleCellKeyDown(e, rowIndex, colIndex)}
                                dangerouslySetInnerHTML={{ __html: cellValues[rowIndex][colIndex] }}
                            />
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}

export default Sheet;
