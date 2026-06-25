import URLStatus from "../URLStatus"

import type { ProcessedURL } from "../../types/url"

const TableOfUrls = ({ urls }: { urls: ProcessedURL[] }) => {
  return (
    <table className="mt-4">
      <thead>
        <tr className="bg-zinc-950 text-sm">
          <th className="p-3">STATUS</th>
          <th className="p-3">URL</th>
          <th className="p-3">STARTED</th>
          <th className="p-3">ENDED</th>
          <th className="p-3">DURATION</th>
          <th className="p-3">HTTP_STATUS</th>
          <th className="p-3">ERROR</th>
        </tr>
      </thead>
      <tbody>
        {urls.map((url, i) => (
          <tr key={i} className="border-b border-zinc-950 text-sm">
            <td className="flex items-center justify-center p-3">
              <URLStatus status={url.status} />
            </td>
            <td className="p-3">{url.url}</td>
            <td className="p-3">
              {url.started_at
                ? new Date(url.started_at).toLocaleTimeString()
                : "-"}
            </td>
            <td className="p-3">
              {url.ended_at ? new Date(url.ended_at).toLocaleTimeString() : "-"}
            </td>
            <td className="p-3">
              {url.duration ? `${(url.duration / 1000).toFixed(2)}s` : "-"}
            </td>
            <td className="p-3">{url.http_status ?? "-"}</td>
            <td className="p-3">{url.error ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableOfUrls
