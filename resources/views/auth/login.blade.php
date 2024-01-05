@extends('layouts.login')
@section('content')
    <div class="container-fluid">
        <div class="flex justify-center items-center "
             style=" height: 100vh;
             background: url({{asset('assets/img/login-bg.jpg')}}) center center; background-size: cover">
            @if(count($errors) > 0)
                <div class="text-center absolute top-[150px] md:top-[50px] mx-auto">
                    @foreach( $errors->all() as $message )
                        <div class="rounded-lg bg-red-600 text-white p-3">
                            <span>{{ $message }}</span>
                        </div>
                    @endforeach
                </div>
            @endif
            <div class="bg-white shadow-sm border-0 p-5 rounded-lg w-auto md:min-w-[400px]" style="opacity: 0.95">
                <div class="">
                    <img class="mx-auto" src="{{asset('/assets/img/logo.png')}}" height="auto" width="150" alt="CHMS">
                </div>
                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <div>
                            <div class="mb-4">
                                <div class="input-group">
                                    <label for="username" class="text-sm">Username</label> <br>
                                    <input id="username" class="text-sm w-full" placeholder="Username" type="text"
                                           name="username" value="{{ old('username') }}" required
                                           autocomplete="username" autofocus>
                                </div>
                            </div>
                            <div class="input-group mb-2">
                                <label for="password" class="text-sm">Password</label> <br>
                                <input id="password" placeholder="Password" type="password"
                                       class="text-sm w-full" name="password" required
                                       autocomplete="current-password">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="flex items-center gap-x-2 text-sm">
                                <input type="checkbox" class="custom-control-input" name="remember"
                                       id="remember" {{ old('remember') ? 'checked' : '' }}>
                                <label class="custom-control-label"
                                       for="remember">{{ __('Remember Me') }}</label>
                            </div>
                            {{--<div class="col-md-6 text-right">
                                @if (Route::has('password.request'))
                                    <a class="" href="{{ route('password.request') }}">
                                        {{ __('Forgot Password?') }}
                                    </a>
                                @endif
                            </div>--}}
                        </div>

                        <div class="mb-2">
                            <button type="submit" class="bg-blue-600 w-full text-white h-11">
                                {{ __('LOGIN') }}
                            </button>
                        </div>
                    </form>
                </div>
                <div class="text-center text-xs">
                    <p> &copy; {{date('Y')}} - Powered by TechLineAfrica</p>
                </div>
            </div>
        </div>
    </div>
@endsection
