
import { ApiBase, Response } from './api_base';
import { RemoteError } from './nludb_error';
import { Configuration } from './shared/Configuration';
import { GetParams } from './shared/Requests';

const _EXPECT = (client: ApiBase, data: unknown) => { 
  return new App(client, data as AppParams) 
}

export interface AppParams {
  id?: string;
  name?: string;
  handle?: string;
  userHandle?: string;
}

export class App {
  id?: string;
  name?: string;
  handle?: string;
  userHandle?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: AppParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
    this.userHandle = params.userHandle
  }

  async delete(config?: Configuration): Promise<Response<App>> {
    return (await this.client.post(
      'app/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'app',
        ...config
      }
    )) as Response<App>;
  }

  static async create(
    client: ApiBase,
    params?: AppParams,
    config?: Configuration
  ): Promise<Response<App>> {
    return (await client.post(
      'app/create',
      { ...params },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'app',
      }
    )) as Response<App>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<App>> {
    return (await client.post(
      'app/get',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'app',
        ...config
      },
    )) as Response<App>;
  }

  get(
    path: string,
    params?: Record<string, unknown>,
    config?: Configuration
  ): Promise<unknown> {
    return this.client.get(
      path,
      {...params},
      {...config, appCall: true, appOwner: this.userHandle},
    )  
  }

  post(
    path: string,
    params?: Record<string, unknown>,
    config?: Configuration
  ): Promise<unknown> {
    return this.client.post(
      path,
      {...params},
      {...config, appCall: true, appOwner: this.userHandle},
    )  
  }


}
