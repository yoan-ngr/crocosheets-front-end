import React, { useState, useEffect } from 'react';

function Sheet() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [selectedCell, setSelectedCell] = useState(null);
    let cell_focus;
    const handleCellClick = (rowIndex, colIndex) => {
        setSelectedCell({ row: rowIndex, col: colIndex });
    };

    const handleCellDoubleClick = (e) => {
        e.target.contentEditable = true;
        e.target.focus();
        cell_focus = e.target;
    };

    const handleCellKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.contentEditable = false;
            e.target.blur();
            e.target.innerText = e.target.innerText.replace(/\n/g, '');
        }
    };

    // Gestion de l'événement global pour l'appui sur "Entrée"

    const handleGlobalKeyDown = (e) => {
        if (e.key === 'Enter' && selectedCell ) {
            const selectedCellElement = document.querySelector(`#cell-${selectedCell.row}-${selectedCell.col}`);
            console.log("111111111111111111111111")
            console.log("cell_focus : " + cell_focus)
            console.log("select : " + selectedCellElement.id)

            if (selectedCellElement && (cell_focus !== selectedCellElement)) {
                e.preventDefault(); // Empêche l'ajout de la nouvelle ligne
                selectedCellElement.contentEditable = true;
                selectedCellElement.focus();
                cell_focus = selectedCellElement;
            } else if (selectedCellElement && cell_focus === selectedCellElement) {
                selectedCellElement.blur(); // Supprime le focus de la cellule en cours d'édition
                console.log("222222222222222222222")
            }
        }
    };


    useEffect(() => {
        // Écoute des touches enfoncées au niveau de la page entière
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            // Nettoyage de l'écouteur d'événement lors du démontage du composant
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
                    <tr key={rowIndex}>
                        <td className="w-12">{alphabet.charAt(rowIndex)}</td>
                        {Array.from({ length: 26 }, (_, colIndex) => (
                            <td id = {rowIndex+"-"+colIndex }
                                key={colIndex}
                                id={`cell-${rowIndex}-${colIndex}`}
                                contentEditable={selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex}
                                className={`w-48 max-w-[6rem] overflow-x-hidden border-solid font-mono border border-black p-2 ${
                                    selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'bg-green-800' : ''
                                }`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                onDoubleClick={handleCellDoubleClick}
                                onKeyDown={handleCellKeyDown}
                            ></td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sheet;
