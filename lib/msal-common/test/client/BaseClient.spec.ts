import chai from "chai";
import chaiAsPromised from "chai-as-promised";
const expect = chai.expect;
chai.use(chaiAsPromised);
import { BaseClient } from "../../src/client/BaseClient";
import { Configuration } from "../../src/config/Configuration";
import {Constants} from "../../src";
import {AADServerParamKeys, HeaderNames} from "../../src/utils/Constants";
import {ClientTestUtils} from "./ClientTestUtils";

class TestClient extends BaseClient {

    constructor(config: Configuration) {
        super(config);
    }

    getLogger(){
        return this.logger;
    }

    getConfig(){
        return this.config;
    }

    getCryptoUtils(){
        return this.cryptoUtils;
    }

    getCacheStorage(){
        return this.cacheManager;
    }

    getNetworkClient(){
        return this.networkClient;
    }

    getCacheManger(){
        return this.cacheManager;
    }

    getAccount(){
        return this.account;
    }

    getDefaultAuthorityInstance(){
        return this.defaultAuthorityInstance;
    }

    createDefaultLibraryHeaders(): Map<string, string> {
        return super.createDefaultLibraryHeaders();
    }

    createDefaultTokenRequestHeaders(): Map<string, string> {
        return super.createDefaultTokenRequestHeaders();
    }
}

describe("BaseClient.ts Class Unit Tests", () => {

    let config: Configuration;
    beforeEach(() => {
        config = ClientTestUtils.createTestClientConfiguration();
        });

    describe("Constructor", () => {

        it("Creates a valid BaseClient object", () => {

            const client = new TestClient(config);
            expect(client).to.be.not.null;
            expect(client instanceof BaseClient).to.be.true;
        });

        it("Sets fields on BaseClient object", () => {

            const client = new TestClient(config);
            expect(client.getAccount()).to.be.not.null;
            expect(client.getCacheManger()).to.be.not.null;
            expect(client.getCacheStorage()).to.be.not.null;
            expect(client.getConfig()).to.be.not.null;
            expect(client.getCryptoUtils()).to.be.not.null;
            expect(client.getDefaultAuthorityInstance()).to.be.not.null;
            expect(client.getNetworkClient()).to.be.not.null;
        });
    });


    describe("Header utils", () => {

        it("Creates default library headers", () => {

            const client = new TestClient(config);
            const headers = client.createDefaultLibraryHeaders();

            expect(headers.get(AADServerParamKeys.X_CLIENT_SKU)).to.eq(Constants.LIBRARY_NAME);
            expect(headers.get(AADServerParamKeys.X_CLIENT_VER)).to.eq("0.0.1");
        });

        it("Creates default token request headers", () => {

            const client = new TestClient(config);
            const headers = client.createDefaultTokenRequestHeaders();

            expect(headers.get(AADServerParamKeys.X_CLIENT_SKU)).to.eq(Constants.LIBRARY_NAME);
            expect(headers.get(AADServerParamKeys.X_CLIENT_VER)).to.eq("0.0.1");
            expect(headers.get(HeaderNames.CONTENT_TYPE)).to.eq(Constants.URL_FORM_CONTENT_TYPE);
        });
    });
});