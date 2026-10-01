export interface ArticleSection {
  heading: string;
  paragraph?: string;
  bullets?: string[];
  code?: string;
}

export interface Article {
  slug: string;
  title: string;
  tag: string;
  minutes: number;
  summary: string;
  linkedin?: string;
  sections: ArticleSection[];
}

export const articles: Article[] = [
  {
    slug: 'connected-assets-in-aem-as-a-cloud-service',
    title: 'Connected Assets in AEM as a Cloud Service',
    tag: 'Assets',
    minutes: 8,
    linkedin: 'https://lnkd.in/p/dpZpgyww',
    summary: 'How a Sites deployment searches and uses assets that stay managed in a remote DAM: roles, CORS, cookies, launchers and troubleshooting.',
    sections: [
      { heading: 'What it is', paragraph: 'Connected Assets lets a separate Sites deployment search and use assets that stay managed in a remote Assets deployment (the DAM). Sites gets read-only fetched copies under a mount point such as /content/dam/connectedassets. It is not repository sync and it is not bidirectional.' },
      { heading: 'Good to know', bullets: ['One remote Assets deployment can serve many Sites deployments; one Sites deployment connects to only one remote DAM.', 'Images and documents are supported. Content Fragments and video are not.', 'Remote updates reach the local copy with some delay; the remote DAM stays the system of record.', 'Adobe currently recommends evaluating Dynamic Media with OpenAPI for new Cloud integrations. Use Connected Assets when its remote-DAM authoring model is the actual requirement.'] },
      { heading: 'Setup order that avoids guesswork', bullets: ['Create the roles: a DAM distributor on the remote side (Sites Authors plus connectedassets-assets-techaccts) and a Sites technical user (connectedassets-sites-techaccts).', 'Configure CORS on the remote Assets deployment with the exact Sites origin: scheme, host and port.', 'Set the login-token cookie to SameSite=None, which only applies over HTTPS.', 'Exclude the connectedassets mount point from the DAM Update Asset and DAM Metadata Writeback launchers so fetched assets are not reprocessed.', 'Create the config under Tools > Assets > Connected Assets Configuration and run the connection test.'] },
      { heading: 'SameSite cookie config', code: 'com.day.crx.security.token.impl.TokenAuthenticationHandler.cfg.json\n{\n  "token.samesite.cookie.attr": "None"\n}' },
      { heading: 'Troubleshooting', bullets: ['CORS error in the browser: the origin is not allowed. Check exact scheme and port.', 'Unauthorized: check technical-user groups and credentials on both sides.', 'Works locally but not in Cloud: the configuration was not deployed through Cloud Manager.', 'Asset fetch fails later: check the asynchronous jobs and remote permissions.'] },
      { heading: 'The Cloud lesson', paragraph: 'Local SDK changes made in the Web Console are a learning tool. In Cloud, configuration is code delivered through the pipeline. Avoid wildcard CORS in production, and remember that local HTTP testing cannot prove HTTPS cookie behavior.' }
    ]
  },
  {
    slug: 'direct-binary-upload-the-cloud-way-to-ingest-assets',
    title: 'Direct Binary Upload: the Cloud way to ingest assets',
    tag: 'Assets',
    minutes: 9,
    linkedin: 'https://lnkd.in/p/dwF_W-5e',
    summary: 'Replacing legacy binary ingestion with the three-phase Cloud protocol: initiate, PUT, complete, with chunking, retries and safety rules.',
    sections: [
      { heading: 'Why the approach changed', paragraph: 'Older integrations posted the file into an AEM endpoint such as createasset.html. For AEM as a Cloud Service, Adobe treats original-binary creation and update through those older paths as unsupported. AEM now coordinates the upload and the binary goes straight to cloud storage.' },
      { heading: 'The three phases', bullets: ['Initiate: POST to the DAM folder with the .initiateUpload.json selector, sending fileName and exact fileSize. Success is HTTP 201.', 'Upload: PUT the bytes to the uploadURIs returned. Success is HTTP 201 for each PUT.', 'Complete: POST to completeURI with uploadToken, fileName and mimeType. Success is HTTP 200, and only then does processing begin.'] },
      { heading: 'Initiate request', code: 'POST https://{aem-author}/content/dam/{folder}.initiateUpload.json\nContent-Type: application/x-www-form-urlencoded\n\nfileName=product.jpg&fileSize=123456' },
      { heading: 'Chunking rules', bullets: ['If fileSize <= maxPartSize, send the whole file in one PUT to the first URI.', 'Otherwise split at maxPartSize and upload parts in URI order.', 'Every part except the last must be at least minPartSize; the last may be smaller.', 'Example: 20,000 bytes with max 8,000 becomes 8,000 + 8,000 + 4,000.', 'Never divide the file size by the number of URIs to pick a chunk size.'] },
      { heading: 'Retries', bullets: ['Retry 404 on initiate or complete with backoff: cloud storage can be eventually consistent.', 'Retry 408, 429 and 5xx on PUT with bounded backoff.', 'Do not retry 400, 401 or 403. Fix the request or the permissions.'] },
      { heading: 'Safety rules', bullets: ['Never delete the source file after the PUT alone. Delete only after complete returns 200.', 'Do not send AEM credentials to the upload URI.', 'Capture the Affinity-cookie from the initiate response headers and send it on complete.', 'Keep passwords, tokens and presigned URIs out of logs.'] },
      { heading: 'Local SDK vs Cloud', paragraph: 'The local SDK can answer initiateUpload with HTTP 200 and only folderPath and fileName, without upload URIs or a token. Do not treat that as a Cloud-style success. Validate the real protocol on an AEM as a Cloud Service environment.' }
    ]
  },
  {
    slug: 'aem-assets-apis-and-content-fragment-management',
    title: 'AEM Assets APIs and Content Fragment management',
    tag: 'APIs',
    minutes: 8,
    summary: 'A map of the Assets API family for Cloud: what is supported, what is deprecated, and how Content Fragment management differs from delivery.',
    sections: [
      { heading: 'It is not one API', paragraph: 'Pick the mechanism from the business operation, not from the phrase “Assets API”.' },
      { heading: 'Which tool for which job', bullets: ['Upload an original binary: Direct Binary Upload.', 'Asset metadata and lifecycle: Assets HTTP API or the modern Assets OpenAPI.', 'Folders: Assets HTTP API or the Folders API.', 'Manage Content Fragments and models: Content Fragment and Model Management OpenAPI.', 'Deliver Content Fragments: Delivery OpenAPI or GraphQL.'] },
      { heading: 'What is deprecated for Cloud', paragraph: 'Creating or updating original binaries through the Assets HTTP API, Sling POST and the Java AssetManager methods (createAsset and related) is a migration candidate. Folder, metadata, comment, copy, move and delete operations remain documented. Treat binary rendition calls as legacy knowledge.' },
      { heading: 'Metadata update', code: 'PUT /api/assets/myfolder/myAsset.png\nContent-Type: application/json\n\n{"class":"asset","properties":{"dc:title":"My Asset"}}' },
      { heading: 'Metadata gotcha', paragraph: 'The HTTP API exposes a subset of metadata. dc:title maps to jcr:title, but namespaces are not fully synchronized for every property. For the complete picture, inspect jcr:content/metadata in the repository.' },
      { heading: 'Management vs delivery', bullets: ['Management is for administration and integration on Author: create, read, update, delete models and fragments.', 'Delivery is for consumer reads and caching. A management GET is not a delivery API.', 'Use Delivery OpenAPI for a simple REST contract; use GraphQL when consumers need different field selections and persisted queries.'] },
      { heading: 'Status codes worth memorizing', bullets: ['200 success, 201 created, 204 copy or move to an existing destination.', '404 missing or inaccessible, sometimes just eventual consistency.', '409 conflict, usually the name already exists.', '412 precondition failed, and 500 for server-side problems.'] },
      { heading: 'Inside AEM', paragraph: 'Java code still reads DAM content through ResourceResolver, Resource and Asset. The Cloud restriction targets binary ingestion, not all DAM access. S3 is useful as an external source in labs; it is not your own bucket acting as AEM Cloud internal storage.' }
    ]
  }
];
