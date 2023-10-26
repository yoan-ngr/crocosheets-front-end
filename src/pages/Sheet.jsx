import React, { useState } from 'react';

function Sheet() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return (
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
                    <tr key={rowIndex}>
                        <td className="w-12">{alphabet.charAt(rowIndex)}</td>
                        {Array.from({length: 26}, (_, colIndex) => (
                            <td
                                key={colIndex}
                                contentEditable
                                className="w-48 max-w-[6rem] overflow-x-hidden border-solid border border-black p-2"
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
