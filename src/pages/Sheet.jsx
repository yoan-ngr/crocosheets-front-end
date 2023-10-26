import React, { useState, useEffect } from 'react';

function Sheet() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [selectedCell, setSelectedCell] = useState(null);
    let cell_focus = null; // cellules dans sur la quel est le focus

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

    const handleGlobalKeyDown = (e) => {
        const selectedCellElement = document.querySelector(`#cell-${selectedCell.row}-${selectedCell.col}`);

        if (e.key === 'Enter' && selectedCell) {
            if (selectedCellElement && cell_focus !== selectedCellElement) {
                e.preventDefault(); // Empêche l'ajout de la nouvelle ligne
                selectedCellElement.contentEditable = true;
                selectedCellElement.focus();
                cell_focus = selectedCellElement;
            } else if (selectedCellElement && cell_focus === selectedCellElement) {
                selectedCellElement.blur(); // Supprime le focus de la cellule en cours d'édition
                cell_focus = null;
            }
        } else if (!cell_focus) {
            if (e.key === 'ArrowUp' && selectedCell.row > 0) {
                setSelectedCell({ row: selectedCell.row - 1, col: selectedCell.col });
            } else if (e.key === 'ArrowDown' && selectedCell.row < 25) {
                setSelectedCell({ row: selectedCell.row + 1, col: selectedCell.col });
            } else if (e.key === 'ArrowLeft' && selectedCell.col > 0) {
                setSelectedCell({ row: selectedCell.row, col: selectedCell.col - 1 });
            } else if (e.key === 'ArrowRight' && selectedCell.col < 25) {
                setSelectedCell({ row: selectedCell.row, col: selectedCell.col + 1 });
            }
        }
    };

    useEffect(() => {
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
                    <tr key={rowIndex}>
                        <td className="w-12">{alphabet.charAt(rowIndex)}</td>
                        {Array.from({ length: 26 }, (_, colIndex) => (
                            <td
                            key={colIndex}
                            id={`cell-${rowIndex}-${colIndex}`}
                            contentEditable={selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex}
                            className={`w-48 max-w-[6rem] overflow-x-hidden border-solid border border-black p-2 ${
                                selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'bg-green-200' : ''
                            }`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            onDoubleClick={handleCellDoubleClick}
                            onKeyDown={handleCellKeyDown}
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
