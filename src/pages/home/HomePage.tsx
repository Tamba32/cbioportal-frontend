import * as React from 'react';
import CBioPortalAPI from "../../shared/api/generated/CBioPortalAPI";
import {CancerStudy} from "../../shared/api/generated/CBioPortalAPI";
import AppConfig from 'appConfig';
import {getCbioPortalApiUrl} from "../../shared/api/urls";
import {observer} from 'mobx-react';
import client from "shared/api/cbioportalClientInstance";
import {remoteData, addErrorHandler} from "shared/api/remoteData";
import BarGraph from "shared/components/barGraph/BarGraph";

// interface IHomePageProps
// {
// }

export class HomePageStore {

    readonly data = remoteData({
        invoke: () => {
            return client.getAllStudiesUsingGET({projection: "DETAILED"});

        }
    });
}


@observer
export default class HomePage extends React.Component<{}, {}> {

    private store: HomePageStore;

    constructor() {
        super();
        this.store = new HomePageStore();
    }

    public render() {
        if (this.store.data.isComplete) {
            return (
                <BarGraph data={this.store.data.result}/>
            );
        } else {
            return null;
        }
    };
}



