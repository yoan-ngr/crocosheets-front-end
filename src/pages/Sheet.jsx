import React, { useState } from 'react';

function Sheet() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return (
        <table className="table">
            <thead>
            <tr>
                <th className="w-12"></th>
                {Array.from({ length: 27 }, (_, index) => (
                    <th key={index} className="w-12">
                        {index}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {Array.from({ length: 27 }, (_, rowIndex) => (
                <tr key={rowIndex}>
                    <td className="w-12">{alphabet.charAt(rowIndex)}</td>
                    {Array.from({ length: 27 }, (_, colIndex) => (
                        <td
                            key={colIndex}
                            contentEditable
                            className="w-12 border-solid border border-black p-2"
                        ></td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Sheet;
