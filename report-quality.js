(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.GaiaWorldQuality=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
function evaluate(report,now=Date.now()){const issues=[];const add=(severity,code,message)=>issues.push({severity,code,message});if(!report||typeof report!=='object')return {pass:false,issues:[{severity:'error',code:'INVALID_REPORT',message:'No valid report supplied'}]};
const entries=report.schemaVersion==='gaiaworld.location-evidence.v1'?report.observations:report.schemaVersion==='gaiaworld.portfolio-evidence.v1'?report.locations?.flatMap(x=>x.nearestRecords||[]):null;
if(!Array.isArray(entries))add('error','UNKNOWN_SCHEMA','Unsupported evidence report structure');
if(!Number.isFinite(Date.parse(report.generatedAt)))add('error','INVALID_TIMESTAMP','Report generation timestamp is missing');
const sourceTime=Date.parse(report.sourceLastFetchedAt||report.lastSuccessfulFetchAt||'');
if(!Number.isFinite(sourceTime))add('warning','MISSING_FETCH_TIME','The source fetch time is unavailable');
else if(sourceTime>now+60000)add('error','FUTURE_FETCH','Source fetch timestamp is in the future');
else if(now-sourceTime>86400000)add('warning','STALE_FETCH','Source observations were fetched more than 24 hours ago');
for(const [i,o] of (entries||[]).entries()){if(!o.source||typeof o.source!=='string')add('error','MISSING_SOURCE','Record '+(i+1)+' has no source');
if(o.originalUrl!=null&&(!/^https:\/\//.test(o.originalUrl)))add('error','UNSAFE_URL','Record '+(i+1)+' has an invalid source link');
if(o.coordinates!=null&&(!Array.isArray(o.coordinates)||!Number.isFinite(o.coordinates[0])||!Number.isFinite(o.coordinates[1])||Math.abs(o.coordinates[0])>180||Math.abs(o.coordinates[1])>90))add('error','BAD_COORDINATES','Record '+(i+1)+' has invalid coordinates');
if(o.distanceKm!=null&&(!Number.isFinite(o.distanceKm)||o.distanceKm<0))add('error','BAD_DISTANCE','Record '+(i+1)+' has invalid distance');
}
const text=JSON.stringify(report).toLowerCase();if(/\b(guaranteed safe|no risk|will prevent deaths)\b/.test(text))add('error','UNSUPPORTED_CERTAINTY','Report contains an unsupported safety or prevention claim');
if(!Array.isArray(report.limitations)||report.limitations.length===0)add('warning','MISSING_LIMITATIONS','No methodology limitations documented');
return {pass:!issues.some(x=>x.severity==='error'),issues,checkedRecords:(entries||[]).length,checkedAt:new Date(now).toISOString()};
}return {evaluate};});
