import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new PluginInstance(client, data as PluginInstanceParams);
};

const _EXPECT_LIST = (client: ApiBase, data: unknown) => {
  if (!data) {
    return []
  }
  return {
    pluginInstances: ((data as any).pluginInstances as Array<any>).map(x => _EXPECT(client, x))
  }
}

export interface GetParams {
  id?: string;
  name?: string;
  handle?: string;
  pluginHandle?: string;
}

export interface PluginInstanceListParams {
  pluginId?: string
  pluginVersionId?: string
}

export interface PluginInstanceList {
  pluginInstances: PluginInstance[]
}

export interface PluginInstanceParams {
  id?: string;
  name?: string;
  handle?: string;
  pluginId?: string;
  pluginInstanceId?: string;
  pluginVersionId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  userHandle?: string;
  spaceId?: string;
}

export interface CreatePluginInstance {
  id?: string;
  name?: string;
  handle?: string;
  pluginId?: string;
  pluginVersionId?: string;
  pluginHandle?: string;
  pluginVersionHandle?: string;
  spaceId?: string;
  upsert?: boolean;
}

export class PluginInstance {
  id?: string;
  name?: string;
  handle?: string;
  pluginId?: string;
  pluginVersionId?: string;
  spaceId?: string;
  userId?: string;
  userHandle?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: PluginInstanceParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
    this.pluginId = params.pluginId;
    this.pluginVersionId = params.pluginVersionId;
    this.spaceId = params.pluginInstanceId;
    this.userId = params.userId;
    this.userHandle = params.userHandle;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.description = params.description;
  }

  async delete(config?: Configuration): Promise<Response<PluginInstance>> {
    return (await this.client.post(
      'plugin/instance/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'pluginInstance',
        ...config,
      }
    )) as Response<PluginInstance>;
  }

  static async create(
    client: ApiBase,
    params: CreatePluginInstance,
    config?: Configuration
  ): Promise<Response<PluginInstance>> {
    return (await client.post(
      'plugin/instance/create',
      { ...params },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'pluginInstance',
      }
    )) as Response<PluginInstance>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<PluginInstance>> {
    return (await client.post(
      'plugin/instance/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'pluginInstance',
        ...config,
      }
    )) as Response<PluginInstance>;
  }

  static async list(
    client: ApiBase,
    params?: PluginInstanceListParams,
    config?: Configuration
  ): Promise<Response<PluginInstanceList>> {
    return (await client.post(
      'plugin/instance/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config
      },
    )) as Response<PluginInstanceList>;
  }



}
