import { ExceptionBase } from './exception.base';

export enum Exceptions {
  argumentInvalid = 'ArgumentInvalidException',
  argumentOutOfRange = 'ArgumentOutOfRangeException',
  argumentNotProvided = 'ArgumentNotProvidedException',
  authException = 'AuthException',
  notFound = 'NotFoundException',
  domainException = 'DomainException',
  conflict = 'ConflictException',
}

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  readonly name = Exceptions.argumentInvalid;
}

/**
 * Used to indicate an object wasn't found
 *
 * @class NotFoundException
 * @extends {ExceptionBase}
 */
export class NotFoundException extends ExceptionBase {
  readonly name = Exceptions.notFound;
}

/**
 * Used to indicate an error of authentication
 *
 * @class AuthException
 * @extends {ExceptionBase}
 */
export class AuthException extends ExceptionBase {
  readonly name = Exceptions.authException;
}
