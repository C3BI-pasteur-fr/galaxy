"""
Created on 08/01/2016

@author: Fabien Mareuil
"""
"""
import functools
import ldap
 
def add_userfromemail(fonc):
    @functools.wraps(fonc)
    def innerfunc(d, k , params):
        if params['email']:
            usernamefromemail = params['email'].split('@')[0]
            params['usernamefromemail'] =  usernamefromemail
        result = fonc(d, k, params)
        return result
    return innerfunc

   
def match_shortlongpasteuremail(fonc):
    @functools.wraps(fonc)
    def innerfunc(*args, **kwargs):
        if 'login' in kwargs:
            login = kwargs['login']
            if '@pasteur.fr' in login:
                email_user , email_domain = login.split('@')
                if '.' in email_user:
                    ld = ldap.initialize('ldaps://ldap.pasteur.fr')
                    ld.simple_bind_s()
                    basedn = "ou=utilisateurs,dc=pasteur,dc=fr"
                    filter = "(mail={0})".format(login)
                    fields = ['uid', 'mail']
                    user = ld.search_ext_s(basedn,ldap.SCOPE_SUBTREE,filter,fields)
                    if len(user) == 1:
                        dn, entry = user[0]
                        login = '{0}@pasteur.fr'.format(entry['uid'][0])
                        kwargs['login'] = login
        result = fonc(*args, **kwargs)
        return result
    return innerfunc   
"""
            

