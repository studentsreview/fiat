import { useEffect, useState } from 'react'
import { api } from 'shared/modules/api'

export const Home: React.FC = () => {
	const [data, setData] = useState({})
	useEffect(() => {
		api
			.request(
				`
        query {
          teachers(take: 1000) {
            name
          }
					courses(take: 1000) {
						name
					}
        }
      `
			)
			.then(setData)
	}, [])

	return <pre>{JSON.stringify(data, null, 2)}</pre>
}
