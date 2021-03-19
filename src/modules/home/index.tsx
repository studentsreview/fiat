import { useEffect, useState } from 'react'
import { api } from 'shared/modules/api'

export const Home: React.FC = () => {
	const [data, setData] = useState({})
	useEffect(() => {
		api
			.request(
				`
      query {
        reviews(take: 10) {
          text
          teacher {
            name
          }
        }
      }
    `
			)
			.then(setData)
	}, [])

	return <pre>{JSON.stringify(data, null, 2)}</pre>
}
