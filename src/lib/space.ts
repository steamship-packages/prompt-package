import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';
import { CreateParams, GetParams } from './shared/Requests';

export interface SpaceParams {
  id?: string;
  handle?: string;
  name?: string;
}

const _EXPECT = (client: ApiBase, data: unknown) => { 
  return new Space(client, data as SpaceParams) 
}

export class Space {
  client: ApiBase;
  id?: string;
  name?: string;
  handle?: string;

  constructor(client: ApiBase, params: SpaceParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
  }

  async delete(
    config?: Configuration) {
    return (await this.client.post(
      'space/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'space',
        ...config
      }
    )) as Response<Space>;
  }

  static async create(
    client: ApiBase,
    params?: CreateParams,
    config?: Configuration
  ): Promise<Response<Space>> {
    return (await client.post(
      'space/create',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'space',
        ...config
      },
    )) as Response<Space>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<Space>> {
    return (await client.post(
      'space/get',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'space',
        ...config
      },
    )) as Response<Space>;
  }
}