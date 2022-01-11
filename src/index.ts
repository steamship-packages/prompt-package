export { Client } from './lib/nludb';
export { RemoteError } from './lib/nludb_error';

// Embedding
export { EmbeddingIndex } from './lib/embedding_index';
export { EmbeddingModel } from './lib/types/embedding_model';
export type {
  CreateIndexRequest,
  SearchResult,
  SearchRequest,
  InsertRequest,
  InsertResult,
  IndexSnapshotRequest,
  IndexSnapshotResponse,
} from './lib/types/embedding';

// Classifiers
export { Classifier } from './lib/classifier';
export { ClassifierModel } from './lib/types/classifier_model';
export type {
  CreateClassifierRequest,
  CreateClassifierResult,
} from './lib/types/classifier';

export { ParsingModel } from './lib/types/parsing_model';
export type { ParseRequest, ParseResponse } from './lib/types/parsing';

export type {
  SearchHit,
  NludbTaskStatus,
  TaskStatusResponse,
  Metadata,
} from './lib/types/base';

export type {
  AddTaskCommentRequest,
  TaskCommentResponse,
  ListTaskCommentRequest,
  ListTaskCommentResponse,
  DeleteTaskCommentRequest,
} from './lib/types/task_comment';

export { NludbTask, Response } from './lib/api_base';

export type {
  CreateModelRequest,
  Model,
  ModelAdapterType,
  ModelType,
  ListModelsResponse,
  ListPrivateModelsRequest,
  ListPublicModelsRequest,
  DeleteModelRequest,
} from './lib/types/Models';
