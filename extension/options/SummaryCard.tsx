import FeatherIcon from "feather-icons-react"
import { useState } from "react"

export interface SummaryCardProps {
  person: string
  text: string
  date: string
  action: string
  links: [string, string][]
}

const SummaryCard = ({
  text,
  person,
  date,
  action,
  links
}: SummaryCardProps) => {
  let [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`p-6 rounded-[2rem] my-4 space-y-2 bg-background-light border cursor-pointer ${person == "You" || person == "You're" ? "border-primary" : "border-border-color"}`}
      onClick={() => setExpanded(!expanded)}>
      <div>
        <span className="text-xl text-left font-bold">{person}</span>
        <span className="text-xl">&nbsp;{action}</span>
      </div>
      <div className="flex items-center space-x-2">
        <FeatherIcon icon="clock" size={16} className="text-primary" />
        <span className="text-base text-left text-primary">{date}</span>
      </div>
      <div className="text-base text-text-secondary">{text}</div>
      {expanded ? (
        <div className="flex flex-col text-base">
          {links.map((link, index) => (
            <div className="my-4">
              <a
                key={index}
                href={link[1]}
                className="text-primary hover:text-purple-500">
                {link[0].split(".")[0]}
              </a>
              <div className="text-text-secondary text-xs mb-2">
                Visited 2 times
              </div>
              <div className="text-text-secondary">
                Benjamin is currently working on a project related to using Git
                for version control, as evidenced by their browsing of Google
                search results for "git commands" and the Git Cheat Sheet for
                Education provided by GitHub.
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {links.map((link, index) => (
            <a
              key={index}
              href={link[1]}
              className="text-primary hover:text-purple-500 mr-4">
              {link[0].split(".")[0]}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
export default SummaryCard
