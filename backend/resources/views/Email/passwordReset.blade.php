@component('mail::message')
# change Password Request

Click on the button bellow to change password
@component('mail::button', ['url' =>'http://localhost:4200/responseReset?token='.$token])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
