@extends('layouts.login')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center align-items-center "
             style=" height: 100vh;
             background: url({{asset('assets/img/login-bg.jpg')}}) center center; background-size: cover">
            <div class="text-center position-absolute" style="top: 200px; margin-left: auto; margin-right: auto">
                @if(count($errors) > 0)
                    @foreach( $errors->all() as $message )
                        <div class="alert bg-danger text-white alert-dismissible">
                            <button type="button" class="btn-danger" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <span>{{ $message }}</span>
                        </div>
                    @endforeach
                @endif
            </div>
            <div class="col-md-3 text-center">
                <div class="card login-body shadow-sm border-0 d-flex justify-content-center py-5" style="border-radius: 10px; opacity: 0.95">
                    <div>
                        <div class="">
                            <h5 class="title text-capitalize">Church Management</h5>
                        </div>
                        <div class="card-body">
                            <form method="POST" action="{{ route('login') }}">
                                @csrf
                                <div class="form-group row">
                                    <div class="col-md-12 mb-2">
                                        <div class="input-group">
                                            <label for="username" class="sr-only">Username</label>
                                            <input id="username" placeholder="Username" type="text" class="form-control" name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>
                                            <div class="invalid-feedback text-right mb-0">
                                                Required
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="input-group mb-2">
                                            <label for="password" class="sr-only">password</label>
                                            <input id="password"  placeholder="Password" type="password" class="form-control " name="password" required autocomplete="current-password">
                                            <div class="invalid-feedback text-right mb-0">
                                                Required
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-12 text-left">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                            <label class="custom-control-label" for="remember">{{ __('Remember Me') }}</label>
                                        </div>
                                    </div>
                                    {{--<div class="col-md-6 text-right">
                                        @if (Route::has('password.request'))
                                            <a class="" href="{{ route('password.request') }}">
                                                {{ __('Forgot Password?') }}
                                            </a>
                                        @endif
                                    </div>--}}
                                </div>

                                <div class="form-group row mb-0">
                                    <div class="col-md-12">
                                        <button type="submit" class="btn btn-primary btn-block">
                                            {{ __('LOGIN') }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="text-center">
                            <p> &copy; {{date('Y')}} - Powered by TechLineAfrica</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
