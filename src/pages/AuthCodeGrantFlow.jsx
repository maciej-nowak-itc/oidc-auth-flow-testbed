import React, { useEffect, useState } from 'react';
import submitRequest from '../utils/submitRequest';
import decodeJWT from '../utils/decodeJWT';
import SubmitMethods from '../types/SubmitMethods';

const AuthCodeGrantFlow = () => {
    const [tenantId, setTenantId] = useState('');
    const [clientId, setClientId] = useState('');
    const [scopes, setScopes] = useState('openid profile email');
    const [claims, setClaims] = useState('');
    const [redirectUri, setRedirectUri] = useState('http://localhost:3000/auth-code-grant');
    const [authEndpoint, setAuthEndpoint] = useState('');
    // Code-to-token
    const [authCode, setAuthCode] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [tokenEndpoint, setTokenEndpoint] = useState();
    const [token, setToken] = useState(null);
    const [parsedToken, setParsedToken] = useState(null);
    const [error, setError] = useState(null);

    const elaborateAADtenant = (newtenantId) => {
        setAuthEndpoint(`https://login.microsoftonline.com/${newtenantId}/oauth2/v2.0/authorize`);
        setTokenEndpoint(`https://login.microsoftonline.com/${newtenantId}/oauth2/v2.0/token`);
      };

    const handleTenantIdChange = (event) => {
        const newtenantId = event.target.value;
    
        setTenantId(newtenantId);
        elaborateAADtenant(newtenantId);
      };
    const handleClaimsChange = (event) => {
        setClaims(event.target.value);
      };
    
    const handleLogin = () => {
        const authUrl = `${authEndpoint}` +
          `?client_id=${clientId}` +
          `&response_type=code` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&scope=${encodeURIComponent(scopes)}` +
          `&state=12345`;
    
        window.location.href = authUrl;
      };
    
      const handleGetToken = async () => {
        const params = {
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code: authCode,
            redirect_uri: redirectUri
        };

        try {
            const data = await submitRequest(true, tokenEndpoint, SubmitMethods.POST_URLENCODED, params);
            setToken(data.access_token);
            setParsedToken(decodeJWT(data.access_token));
            setError(null);
        } catch (err) {
            setError('Failed to fetch the token. Please check your inputs.');
            setToken(null);
        }
      };
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
    
        if (code) {
          setAuthCode(code);
        } else {
          setAuthCode(null);
        }
      }, []);

    return (
        <div>
            <h2>Authorization Code Grant Flow</h2>
            (!)AAD only.
            <h3>Phase 1. Authorize, get code</h3>
            <div>
                <label>Tenant ID:</label>
                <input
                type="text"
                value={tenantId}
                onChange={handleTenantIdChange}
                required
                />
            </div>

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
                <label>Scopes (space-separated):</label>
                <input
                    type="text"
                    value={scopes}
                    onChange={(e) => setScopes(e.target.value)}
                    required
            />
            </div>

            <div>
                <label>Claims:</label>
                <div><textarea
                    rows="10"
                    cols="120"
                    value={claims}
                    onChange={handleClaimsChange}
                /></div>
            </div>

            <div>
                <label>Auth Endpoint:</label>&nbsp;
                {authEndpoint || "Please provide Tenant ID"}
            </div>

            <div>
                <label>redirect_uri:</label>&nbsp;
                {redirectUri}
                <p class="small-letters warn">Be sure you register the redirect URI as approved target in your AAD. Perhaps I will add DNS masking later.</p>
            </div>
            <button onClick={handleLogin}>Get Code</button>

            {authCode &&(
              <>
                <h3>Phase 2. Acquire token</h3>
                <div>
                    <label>Auth code:</label>
                    <div><textarea rows="5" cols="120" readOnly value={authCode}></textarea></div>
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
                    <label>Token Endpoint:</label>&nbsp;
                    {tokenEndpoint || "Please provide Tenant ID"}
                </div>
                <button onClick={handleGetToken}>Get Token</button>
              </>
            )}
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

            {error && (<p style={{ color: 'red' }}>{error}</p>)}
            
        </div>
    );
};

export default AuthCodeGrantFlow;
