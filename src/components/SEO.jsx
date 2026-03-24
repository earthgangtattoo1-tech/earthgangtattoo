import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, path = '' }) => {
  const baseUrl = 'https://earthgangtattoo.net'
  const fullUrl = `${baseUrl}${path}`

  return (
    <Helmet>
      <title>{title} | Earth Gang Tattoo Chiang Mai</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={`${title} | Earth Gang Tattoo Chiang Mai`} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={`${title} | Earth Gang Tattoo Chiang Mai`} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default SEO
