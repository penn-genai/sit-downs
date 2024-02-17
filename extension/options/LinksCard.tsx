const LinksCard = () => {
    const dummyLinks = [["Plasmo", "https://www.plasmo.com"], ["Plasmo", "https://www.plasmo.com"], ["Plasmo", "https://www.plasmo.com"]];

    return <div className="border border-zinc-200 rounded-lg flex flex-col p-4 basis-8/12">
        <h2 className="text-xl text-center">Links</h2>
        {
            dummyLinks.map(([name, link]) => {
                return <a href={link} className="hover:text-zinc-50">{name} <span className="text-sky-300 hover:text-sky-400">({link})</span></a>
            })
        }
    </div>
}

export default LinksCard