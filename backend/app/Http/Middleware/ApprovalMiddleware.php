<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApprovalMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
       if(auth()->check()){
         if(!auth()->user()->approved){
            auth()->logout();
            return [ 'message'=>'your Account Needs Admin Approval'];
            return redirect()->route('login')->with('message',trans('global.your Account Needs Admin Approval'));
             return redirect()->route('login')->with('message','your Account Needs Admin Approval');
         }
       }

        return $next($request);
    }
}
