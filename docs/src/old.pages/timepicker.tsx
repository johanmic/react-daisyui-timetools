import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Heading from "@theme/Heading"
import Layout from "@theme/Layout"
import { useState } from "react"
import DatePicker from "../../../src/components/DatePicker"
import DocSidebar from "@theme/DocSidebar"
import DocPageStyles from "@docusaurus/theme-classic/lib/theme/DocPage/Layout/styles.module.css"

export default function TimepickerPage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  const [time, setTime] = useState<string>("2024-01-01 12:00")
  return (
    <Layout>
      <Heading as="h1" className="hero__title">
        {siteConfig.title}
      </Heading>
      <div>
        <DocSidebar
          path="/docs/components/timepicker"
          sidebar={[]}
          onCollapse={() => {}}
          isHidden={false}
        />
        <DatePicker
          value={time}
          lang="sv"
          onChange={(value) => {
            setTime(value)
          }}
        />
      </div>
    </Layout>
  )
}
