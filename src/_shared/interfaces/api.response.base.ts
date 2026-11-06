export interface APIResponseBase<T> {
    success: boolean;
    message?: string;
    data: T;
}