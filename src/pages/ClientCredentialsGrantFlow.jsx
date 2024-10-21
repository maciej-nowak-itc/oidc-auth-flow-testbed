import React, { useState } from 'react';
import SubmitMethods from '../types/SubmitMethods';
import SubmitMethodSelect from '../components/SubmitMethodSelect';
import CorsBypass from '../components/CorsBypass';
import submitRequest from '../utils/submitRequest';
import decodeJWT from '../utils/decodeJWT';

const ClientCredentialsGrantFlow = () => {
  const [submitMethod, setSubmitMethod] = useState(SubmitMethods.POST_URLENCODED);
  const [idp, setIdp] = useState('aad');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [scopes, setScopes] = useState('');
  const [tokenEndpoint, setTokenEndpoint] = useState('');
  const [corsBypas, setCorsBypass] = useState(false);
  const [token, setToken] = useState(null);
  const [parsedToken, setParsedToken] = useState(null);
  const [error, setError] = useState(null);

  const elaborateAADtenant = (newtenantId) => {
    setTokenEndpoint(`https://login.microsoftonline.com/${newtenantId}/oauth2/v2.0/token`);
  }

  const handleIdpChange = (event) => {
    const selectedIdp = event.target.value;
    setIdp(selectedIdp);

    if (selectedIdp === 'aad') {
      elaborateAADtenant(tenantId);
    } else {
      setTokenEndpoint('');
    }
  };

  const handleTenantIdChange = (event) => {
    const newtenantId = event.target.value;

    setTenantId(newtenantId);
    elaborateAADtenant(newtenantId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const params = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: scopes,
    };

    try {
      const data = await submitRequest(corsBypas, tokenEndpoint, submitMethod, params);
      setToken(data.access_token);
      setParsedToken(decodeJWT(data.access_token));
      setError(null);
    } catch (err) {
      setError('Failed to fetch the token. Please check your inputs.');
      setToken(null);
    }
  };

  return (
    <div>
      <h2>Client Credentials Grant Flow</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Identity Provider (IdP):</label>
          <select value={idp} onChange={handleIdpChange}>
            <option value="aad">Azure Active Directory (AAD)</option>
            <option value="other">Other IdP</option>
          </select>
        </div>

        {idp === 'aad' && (
          <div>
            <label>Tenant ID:</label>
            <input
              type="text"
              value={tenantId}
              onChange={handleTenantIdChange}
              required
            />
          </div>
        )}

        <div>
          <label>Client ID:</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Client Secret:</label>
          <input
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Scopes (space-separated):</label>
          <input
            type="text"
            value={scopes}
            onChange={(e) => setScopes(e.target.value)}
            required
            placeholder={"api://"+(clientId?clientId:"<clientid>")+"/.default"}
          />
        </div>

        
          <div>
            <label>Token Endpoint:</label>
            {idp !== 'aad' ? (
                <input
                type="text"
                value={tokenEndpoint}
                onChange={(e) => setTokenEndpoint(e.target.value)}
                required
                />
             ) : <div>{tokenEndpoint || "Please provide Tenant ID"}</div> } 
          </div>

          <SubmitMethodSelect
            value={submitMethod}
            onChange={(e) => setSubmitMethod(e.target.value)}
          />

          <CorsBypass
            value={corsBypas}
            onChange={(e) => setCorsBypass(e.target.checked)}
            />

        <button type="submit">Get Token</button>
      </form>

      {token && (
        <div>
          <h2>Access Token:</h2>
          <textarea rows="10" cols="120" readOnly value={token}></textarea>
        </div>
      )}

    {parsedToken && (
        <div>
          <h2>Parsed token:</h2>
          <textarea rows="20" cols="120" readOnly value={JSON.stringify(parsedToken, null, 2)}></textarea>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ClientCredentialsGrantFlow;