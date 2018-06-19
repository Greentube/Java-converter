var org_kociemba_twophase_Tools = 
{
    $: function()
    {
    }
    ,
    verify_1: function(s)
    {
        var count = _dim("I",1,[6,],0);
        try
        {
            for (var i = 0; i < 54; i=(i +1)|0) count[org_kociemba_twophase_Color.valueOf_1(s.substring_2(i,((i + 1)|0))).ordinal_0()]=(count[org_kociemba_twophase_Color.valueOf_1(s.substring_2(i,((i + 1)|0))).ordinal_0()] +1)|0;
        }
        catch (e$)
        {
            var e = e$.throwable;
            if (e instanceof java_lang_IllegalArgumentException.$)
            {
                return -1;
            }
            else { throw e$; }
        }
        for (var i = 0; i < 6; i=(i +1)|0) if (count[i] !== 9) return -1;
        var fc = (new org_kociemba_twophase_FaceCube.$())._1(s);
        var cc = fc.toCubieCube_0();
        return cc.verify_0();
    }
    ,
};
_class(org_kociemba_twophase_Tools, java_lang_Object, null,
"org.kociemba.twophase.Tools" //replace-me-with-empty-string-for-production//
,{
});
//reference// org/kociemba/twophase/Color
//reference// java/lang/IllegalArgumentException
//reference// org/kociemba/twophase/FaceCube
//load// java/lang/Object
