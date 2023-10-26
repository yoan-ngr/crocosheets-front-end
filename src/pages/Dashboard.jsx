import PageTitle from "../components/PageTitle.jsx";

function Dashboard () {
    return <div className="w-3/4 mx-auto">

        <PageTitle text="Dashboard" />
        <button className="btn btn-outline-primary mb-6">Nouveau document</button>
        <div className="flex overflow-x-auto">
            <table className="table-hover table-zebra table">
                <thead>
                <tr>
                    <th>Nom du fichier</th>
                    <th>Date de modification</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr className="cursor-pointer">
                    <th>Feuille de calcul 1</th>
                    <td>26/10/2023 13:29</td>
                    <td><button className="btn btn-solid-error ">Supprimer</button></td>
                </tr>
                <tr>
                    <th>Moyenne semestre</th>
                    <td>26/10/2023 13:29</td>
                    <td><button className="btn btn-solid-error ">Supprimer</button></td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>26/10/2023 13:29</td>
                    <td><button className="btn btn-solid-error ">Supprimer</button></td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>26/10/2023 13:29</td>
                    <td><button className="btn btn-solid-error ">Supprimer</button></td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>26/10/2023 13:29</td>
                    <td><button className="btn btn-solid-error ">Supprimer</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
}

export default Dashboard;